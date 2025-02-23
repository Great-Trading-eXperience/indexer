import { index, onchainTable, relations } from "ponder";

export const pools = onchainTable(
	"pools",
	(t) => ({
		id: t.hex().primaryKey(),
		coin: t.varchar(),
		orderBook: t.hex(),
		baseCurrency: t.hex().notNull(),
		quoteCurrency: t.hex().notNull(),
		lotSize: t.bigint().notNull(),
		maxOrderAmount: t.bigint().notNull(),
	}),
	(table: any) => ({
		coinIdx: index().on(table.coin),
	})
);

export const orders = onchainTable(
	"orders",
	(t: any) => ({
		id: t.bigint().primaryKey(),
		user: t.hex(),
		// coin: t.varchar(),
		side: t.varchar(),
		timestamp: t.integer(),
		price: t.bigint(),
		quantity: t.bigint(),
		filled: t.bigint(),
		type: t.varchar(),
		status: t.varchar(),
		expiry: t.integer(),
		poolId: t.hex().notNull(),
	}),
	(table: any) => ({
		userIdx: index().on(table.user),
		sideIdx: index().on(table.side),
		statusIdx: index().on(table.status),
		poolIdx: index().on(table.poolId), // Index for poolId
	})
);

export const orderHistory = onchainTable(
	"order_history",
	(t: any) => ({
		id: t.text().primaryKey(),
		// coin: t.varchar(),
		orderId: t.bigint(),
		timestamp: t.integer(),
		filled: t.bigint(),
		status: t.varchar(),
		poolId: t.hex().notNull(),
	}),
	(table: any) => ({
		orderIdx: index().on(table.orderId),
		poolIdx: index().on(table.poolId), // Index for poolId
	})
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
	orderHistory: many(orderHistory),
	pool: one(pools, {
		fields: [orders.poolId],
		references: [pools.id],
	}),
	user: one(balances, {
		fields: [orders.user],
		references: [balances.user],
	}),
}));

export const orderHistoryRelations = relations(orderHistory, ({ one }) => ({
	order: one(orders, {
		fields: [orderHistory.orderId],
		references: [orders.id],
	}),
	pool: one(pools, {
		fields: [orderHistory.poolId],
		references: [pools.id],
	}),
}));

export const trades = onchainTable(
	"trades",
	(t) => ({
		id: t.text().primaryKey(),
		transactionId: t.text(),
		orderId: t.bigint(),
		price: t.bigint(),
		quantity: t.bigint(),
		timestamp: t.integer(),
		poolId: t.hex().notNull(),
	}),
	(table) => ({
		transactionIdx: index().on(table.transactionId),
		poolIdx: index().on(table.poolId), // Index for poolId
	})
);

export const tradeRelations = relations(trades, ({ one }) => ({
	order: one(orders, { fields: [trades.orderId], references: [orders.id] }),
	pool: one(pools, {
		fields: [trades.poolId],
		references: [pools.id],
	}),
}));

export const orderBookTrades = onchainTable(
	"order_book_trades",
	(t) => ({
		id: t.text().primaryKey(),
		price: t.bigint(),
		quantity: t.bigint(),
		timestamp: t.integer(),
		transactionId: t.text(),
		side: t.varchar(),
		poolId: t.hex().notNull(),
	}),
	(table) => ({
		transactionIdx: index().on(table.transactionId),
		poolIdx: index().on(table.poolId), // Index for poolId
	})
);

export const hourBuckets = onchainTable("hour_buckets", (t) => ({
	id: t.integer().primaryKey(),
	open: t.real().notNull(),
	close: t.real().notNull(),
	low: t.real().notNull(),
	high: t.real().notNull(),
	average: t.real().notNull(),
	count: t.integer().notNull(),
	poolId: t.hex().notNull(),
}));

export const dailyBuckets = onchainTable("daily_buckets", (t) => ({
	id: t.integer().primaryKey(),
	open: t.real().notNull(),
	close: t.real().notNull(),
	low: t.real().notNull(),
	high: t.real().notNull(),
	average: t.real().notNull(),
	count: t.integer().notNull(),
	poolId: t.hex().notNull(),
}));

export const balances = onchainTable(
	"balances",
	(t) => ({
		user: t.hex().primaryKey(),
		currency: t.hex(),
		amount: t.bigint(),
		lockedAmount: t.bigint(),
	}),
	(table) => ({
		currencyIdx: index().on(table.currency),
	})
);
