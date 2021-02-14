import pyarrow as pa
from make_dataframe import make_df

df = make_df()
schema = pa.Schema.from_pandas(df, preserve_index=False)
table = pa.Table.from_pandas(df, preserve_index=False)

sink = "df.arrow"

# .new_file() creates a RecordBatchFileWriter
with pa.ipc.new_file(sink, schema) as writer:
    writer.write(table)
