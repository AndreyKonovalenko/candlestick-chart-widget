import { Children } from 'react';
import uniqid from 'uniqid';

const Widget = () => {
  const styles = {
    ticketContainer: {
      marginTop: '15px',
      marginLeft: '15px',
      position: 'absolute',
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '19px',
      lineHeight: '115%',
      color: '#72ED93',
    },
    dateContainer: {
      marginTop: '15px',
      marginRight: '15px',
      position: 'absolute',
      left: '-1.18%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      fontFamily: 'inherit',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '19px',
      lineHeight: '115%',
      color: '#FFFFFF',
      textAlign: 'right',
    },
    intervalBar: {
      paddingLeft: '15px',
      marginTop: '268px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: '40px',
      background: '#141414',
      borderRadius: '0px 0px 10px 10px',
      flex: 'none',
      order: '1',
      alignSelf: 'stretch',
      flexGrow: '0',
    },
    intervalStyle: {
      margin: '10px 10px 10px 0px',
      fontSize: '17px',
      fontWeight: '400',
      color: '#8D8D8D',
      fontFamily: 'inherit',
      fontStyle: 'normal',
    },
  };

  const PriceChart = (props) => {
    const { children } = props;
    const styles = {
      priceChart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flexStart',
        padding: '0px',
        position: 'absolute',
        width: '510px',
        height: '308px',
        left: '26px',
        top: '26px',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        fontFamily: 'Roboto, sans-serif',
      },
    };

    return <div style={styles.priceChart}>{children}</div>;
  };

  const Display = (props) => {
    const { children } = props;
    const styles = {
      display: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '15px',
        gap: '10px',
        widget: '510px',
        height: ' 268px',
      },
    };

    return <div style={styles.display}>{children}</div>;
  };

  const Header = (props) => {
    const { children } = props;
    const styles = {
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0px',
        gap: '120px',
      },
    };
    return <div style={styles.header}>{children}</div>;
  };
  const HeaderItem = (props) => {
    const { children, color } = props;
    const styles = {
      headerItem: {
        height: '22px',
      },
      headerItemText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '19px',
        lineHeight: '115%',
        color: color || '#72ED93',
      },
    };
    return (
      <div style={styles.headerItem}>
        <p style={styles.headerItemText}>{children}</p>
      </div>
    );
  };
  const intervals = ['Time', '15m', '1H', '4H', '1D', '1W'];

  // const data = [];
  // intervals.forEach((element) => {
  //   data.push(<Interval key={uniqid()}>{element}</Interval>);
  // });
  // console.log(typeof data);
  const widget = (
    <PriceChart>
      <Display>
        <Header>
          <HeaderItem>BTC/USDT Price Chart</HeaderItem>
          <HeaderItem color={'#FFFFFF'}>23 Septemper 13:00</HeaderItem>
        </Header>
      </Display>
      {/* <div style={styles.ticketContainer}> BTC/USDT Price Chart</div>
      <div style={styles.dateContainer}> 23 Septemper 13:00</div> */}
      <div style={styles.intervalBar}>
        {intervals.map((element) => (
          <div key={uniqid()} style={styles.intervalStyle}>
            {element}
          </div>
        ))}
      </div>
    </PriceChart>
  );

  return widget;
};

export default Widget;
