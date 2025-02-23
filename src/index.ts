import { createHash } from "crypto";
import { ponder } from "ponder:registry";
import {
	dailyBuckets,
	hourBuckets,
	orderBookTrades,
	orderHistory,
	orders,
	trades,
} from "ponder:schema";

const orderStatus = [
	"OPEN",
	"PARTIALLY_FILLED",
	"FILLED",
	"CANCELLED",
	"EXPIRED",
];

function updateCandlestickBucket(
	bucketTable: any,
	intervalInSeconds: number,
	price: BigInt,
	timestamp: number,
	context: any,
	event: any
) {
	const bucketId =
		Math.floor(timestamp / intervalInSeconds) * intervalInSeconds;

	return context.db
		.insert(bucketTable)
		.values({
			id: bucketId,
			open: price,
			close: price,
			low: price,
			high: price,
			average: price,
			count: 1,
			timestamp: bucketId,
			poolId: event.log.address!,
		})
		.onConflictDoUpdate((row: any) => ({
			close: price,
			low: Math.min(Number(row.low), Number(price)),
			high: Math.max(Number(row.high), Number(price)),
			average:
				(Number(row.average) * Number(row.count) + Number(price)) /
				(Number(row.count) + 1),
			count: row.count + 1,
			timestamp: bucketId,
		}));
}

ponder.on("OrderBook:OrderPlaced" as any, async ({ event, context }: any) => {
	// console.log("Order Placed");

	await context.db
		.insert(orders)
		.values({
			id: BigInt(event.args.orderId!),
			user: event.args.user,
			// coin: "ETH/USDC", //TODO: Make configurable
			side: event.args.side ? "Sell" : "Buy",
			timestamp: Number(event.args.timestamp),
			price: BigInt(event.args.price),
			quantity: BigInt(event.args.quantity),
			orderValue: BigInt(event.args.price) * BigInt(event.args.quantity),
			filled: BigInt(0),
			type: event.args.isMarketOrder ? "Market" : "Limit",
			status: orderStatus[Number(event.args.status)],
			expiry: Number(event.args.expiry),
			poolId: event.log.address!,
		})
		.onConflictDoNothing();

	// console.log("placed");

	await context.db.insert(orderHistory).values({
		id: event.transaction.hash,
		orderId: BigInt(event.args.orderId),
		timestamp: Number(event.args.timestamp),
		quantity: BigInt(event.args.quantity),
		filled: BigInt(0),
		status: orderStatus[Number(event.args.status)],
		poolId: event.log.address!,
	});
});

ponder.on("OrderBook:OrderMatched" as any, async ({ event, context }: any) => {
	await context.db.insert(orderBookTrades).values({
		id: createHash("sha256")
			.update(
				`${event.transaction.hash}-${event.args.user}-buy-${event.args.buyOrderId}-${event.args.sellOrderId}-${event.args.executionPrice}-${event.args.executedQuantity}`
			)
			.digest("hex"),
		price: BigInt(event.args.executionPrice),
		quantity: BigInt(event.args.executedQuantity),
		timestamp: Number(event.args.timestamp),
		transactionId: event.transaction.hash,
		side: event.args.side ? "Sell" : "Buy",
		poolId: event.log.address!,
	});

	const id = createHash("sha256")
		.update(
			`${event.transaction.hash}-${event.args.user}-buy-${event.args.buyOrderId}-${event.args.sellOrderId}-${event.args.executionPrice}-${event.args.executedQuantity}`
		)
		.digest("hex");
	await context.db
		.insert(trades)
		.values({
			id: id,
			transactionId: event.transaction.hash,
			orderId: BigInt(event.args.buyOrderId),
			timestamp: Number(event.args.timestamp),
			price: BigInt(event.args.executionPrice),
			quantity: BigInt(event.args.executedQuantity),
			poolId: event.log.address!,
		})
		.onConflictDoNothing();

	await context.db
		.update(orders, { id: event.args.buyOrderId })
		.set((row: any) => ({
			filled: row.filled + BigInt(event.args.executedQuantity),
			status:
				row.filled + BigInt(event.args.executedQuantity) === row.quantity
					? "FILLED"
					: "PARTIALLY_FILLED",
		}));

	const oppositeId = createHash("sha256")
		.update(
			`${event.transaction.hash}-${event.args.user}-sell-${event.args.sellOrderId}-${event.args.buyOrderId}-${event.args.executionPrice}-${event.args.executedQuantity}`
		)
		.digest("hex");

	await context.db
		.insert(trades)
		.values({
			id: oppositeId,
			transactionId: event.transaction.hash,
			orderId: BigInt(event.args.sellOrderId),
			timestamp: Number(event.args.timestamp),
			price: BigInt(event.args.executionPrice),
			quantity: BigInt(event.args.executedQuantity),
			poolId: event.log.address!,
		})
		.onConflictDoNothing();

	await context.db
		.update(orders, { id: event.args.sellOrderId })
		.set((row: any) => ({
			filled: row.filled + BigInt(event.args.executedQuantity),
			status:
				row.filled + BigInt(event.args.executedQuantity) === row.quantity
					? "FILLED"
					: "PARTIALLY_FILLED",
		}));

	const hourlyBucketSeconds = 3600;
	await updateCandlestickBucket(
		hourBuckets,
		hourlyBucketSeconds,
		event.args.executionPrice,
		event.args.timestamp,
		context,
		event
	);

	const dailyBucketSeconds = 86400;
	updateCandlestickBucket(
		dailyBuckets,
		dailyBucketSeconds,
		event.args.executionPrice,
		event.args.timestamp,
		context,
		event
	);
});

ponder.on(
	"OrderBook:OrderCancelled" as any,
	async ({ event, context }: any) => {
		await context.db
			.update(orders, { id: BigInt(event.args.orderId) })
			.set((row: any) => ({
				status: orderStatus[Number(event.args.status)],
				timestamp: event.args.timestamp,
			}));
	}
);

ponder.on("OrderBook:UpdateOrder" as any, async ({ event, context }: any) => {
	const id = createHash("sha256")
		.update(`${event.transaction.hash}-${event.args.filled}`)
		.digest("hex");
	await context.db.insert(orderHistory).values({
		id: id,
		orderId: BigInt(event.args.orderId),
		timestamp: Number(event.args.timestamp),
		filled: BigInt(event.args.filled),
		status: orderStatus[Number(event.args.status)],
		poolId: event.log.address!,
	});

	await context.db
		.update(orders, { id: BigInt(event.args.orderId) })
		.set((row: any) => ({
			status: orderStatus[Number(event.args.status)],
			timestamp: event.args.timestamp,
		}));
});
