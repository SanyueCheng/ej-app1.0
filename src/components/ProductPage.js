import React from 'react';
import { connect } from 'dva';
// import styles from './ProductPage.css';
import {Button, Carousel, Grid, } from 'antd-mobile';
import styles from './ProductPage.css'
import { routerRedux } from 'dva/router'


class ProductPage extends React.Component {

    // constructor(props) {
    //     super(props)
    // }
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading

        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 0);
    }
    render() {
        let datasourse = [
            { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '洗护' },
            { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '保洁' },
            { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '看护' },
            { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '月嫂' },
            { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '其他' },
        ]

        return (
            <div>
                <Button onClick={() => {
                    this.props.dispatch(routerRedux.push({
                        pathname: '/productList'
                    }))
                }}>orderList</Button>
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                // autoplay="true"
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            // href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{ width: '100%', height: '5%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>

                <Grid data={datasourse} columnNum={3} hasLine={false} />

                <div className={styles.main}>
                    <div className={styles.one}>
                        <div className={styles.oneA}></div>
                        <div className={styles.oneA}></div>
                        <div className={styles.oneA}></div>
                    </div>
                    <div className={styles.two}>
                        <div className={styles.twoA}></div>
                        <div className={styles.twoB}></div>
                    </div>
                    <div className={styles.three}>
                        <div className={styles.threeA}></div>
                        <div className={styles.threeB}></div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect()(ProductPage);