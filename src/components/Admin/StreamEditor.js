import React from 'react';
import { DataGrid } from './DataGrid';
import { getColumns } from './shared';
import StreamParamsButtonFormatter from './StreamParamsButtonFormatter';
import StreamStatusButtonFormatter from './StreamStatusButtonFormatter';

class StreamEditor extends React.Component {
  componentDidMount() {
    this.props.flux.actions.ADMIN.load_streams();
  }

  getStreamColumns() {
    const columnValues = [
      {key: "status", name: "Status", formatter: <StreamStatusButtonFormatter flux={this.props.flux}/>, getRowMetaData: (row) => row},
      {key: "pipelineKey", name: "Pipeline Key"},
      {key: "params", name: "Params", formatter: <StreamParamsButtonFormatter flux={this.props.flux}/>, getRowMetaData: (row) => row}
    ];

    return getColumns(columnValues);
  }

  render() {
    return (
      this.getStreamColumns().length > 0 ? 
        <DataGrid 
          rowHeight={40}
          minHeight={500}
          toolbar={null}
          rowSelection={null}
          rowKey="streamId"
          guidAutofillColumn="streamId"
          columns={this.getStreamColumns()}
          rows={this.props.streams}
          handleSave={this.handleSave}
        /> : <div />
    );
  }
}

export default StreamEditor;