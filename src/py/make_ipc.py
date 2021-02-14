import pyarrow as pa
from make_dataframe import make_df

df = make_df()
schema = pa.Schema.from_pandas(df, preserve_index=False)
table = pa.Table.from_pandas(df, preserve_index=False)

# .new_file() creates a RecordBatchFileWriter
with pa.ipc.new_file("data/df.arrow", schema) as writer:
    writer.write(table)
