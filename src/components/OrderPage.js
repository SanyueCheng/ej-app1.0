import React from 'react';
// import { connect } from 'dva';
import { Tabs, Badge, ListView,List } from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;
const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
  const NUM_ROWS = 20;
  let pageIndex = 0;
  
  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  }


class OrderPage extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
    
        this.state = {
          dataSource,
          isLoading: true,
        };
      }
    
      componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    
        // simulate initial Ajax
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);
      }
    
      // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
      // componentWillReceiveProps(nextProps) {
      //   if (nextProps.dataSource !== this.props.dataSource) {
      //     this.setState({
      //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      //     });
      //   }
      // }
    
      onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(++pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
      }



    render() {
        
        const tabs = [
            { title: <Badge >全部订单</Badge> },
            { title: <Badge >待付款</Badge> },
            { title: <Badge >待服务</Badge> },
            { title: <Badge >待评价</Badge> },
          ];

          const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          );
          let index = data.length - 1;
          const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
              index = data.length - 1;
            }
            const obj = data[index--];
            return (
              <div key={rowID} style={{ padding: '0 15px' }}>
                <div
                  style={{
                    lineHeight: '50px',
                    color: '#888',
                    fontSize: 18,
                    borderBottom: '1px solid #F6F6F6',
                  }}
                >{obj.title}</div>
                <div style={{ display: '-webkit-box', padding: '15px 0' }}>
                  <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                  <div style={{ lineHeight: 1 }}>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                    <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
                  </div>
                </div>
              </div>
            );
          };
          
        return (
            <div>
                <Tabs tabs={tabs}
                initialPage={1}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        //renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />










      </div>
     {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
        

      <List renderHeader={() => 'Basic Style'} className="my-list">
        <Item extra={'extra content'}>Title</Item>
      </List>
      <List renderHeader={() => 'Subtitle'} className="my-list">
        <Item arrow="horizontal" multipleLine onClick={() => {}}>
          Title <Brief>subtitle</Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => {}}
          platform="android"
        >
          ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
        </Item>
        <Item
          arrow="horizontal"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          onClick={() => {}}
        >
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
        <Item>Title</Item>
        <Item arrow="horizontal" onClick={() => {}}>Title</Item>
        <Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
          大厦 <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Align Vertical Center'} className="my-list">
        <Item multipleLine extra="extra content">
          Title <Brief>subtitle</Brief>
        </Item>
      </List>
      <List renderHeader={() => 'Icon in the left'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => {}}
        >My wallet</Item>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => {}}
          arrow="horizontal"
        >
          My Cost Ratio
        </Item>
      </List>
      <List renderHeader={() => 'Text Wrapping'} className="my-list">
        <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
        <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
        <Item extra="extra content" multipleLine align="top" wrap>
          Multiple line and long text will wrap. Long Text Long Text Long Text
        </Item>
        <Item extra="no arrow" arrow="empty" className="spe" wrap>
          In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
        </Item>
      </List>
      <List renderHeader={() => 'Other'} className="my-list">
        <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
        <Item>
          <select defaultValue="1">
            <option value="1">Html select element</option>
            <option value="2" disabled>Unable to select</option>
            <option value="3">option 3</option>
          </select>
        </Item>
      </List>
        </div>*/}






      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
            </div>
        );
    }

}
export default OrderPage;