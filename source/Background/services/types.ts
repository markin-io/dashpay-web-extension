export type HeadersSyncProgressInfo = {
  confirmedProgress: number;
  totalProgress: number;
  confirmedSyncedCount: number;
  totalSyncedCount: number;
  totalCount: number;
};

export type TxSyncProgressInfo = {
  progress: number;
  syncedBlocksCount: number;
  totalBlocksCount: number;
  transactionsCount: number;
};

export type SyncProgressInfo = {
  txSyncProgressInfo: TxSyncProgressInfo;
  headersSyncProgressInfo: HeadersSyncProgressInfo;
};

export type TransactionMember = {
  address: string;
  addressType: string;
  satoshis?: number;
};

export type TransactionHistoryItem = {
  from: TransactionMember[];
  to: TransactionMember[];
  type: string;
  time: string;
  txId: string;
  blockHash: string;
  isChainLocked: boolean;
  isInstantLocked: boolean;
  satoshisBalanceImpact: number;
  feeImpact: number;
};

export type CreateTransactionPayload = {
  satoshis: number;
  recipient: string;
};

export type TransactionInfo = {
  changeIndex: number;
  changeScript: string;
  fee: number;
  hash: string;
  inputs: [];
  nLockTime: number;
  outputs: [];
  version: number;
};
