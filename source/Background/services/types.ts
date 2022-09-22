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
