import uniqid from 'uniqid';

const Widget = () => {
  const PriceChart = (props) => {
    const { children } = props;
    const styles = {
      priceChart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        <span style={styles.headerItemText}>{children}</span>
      </div>
    );
  };

  const TimeSwitch = () => {
    const styles = {
      timeSwitch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0px 15px',
        height: '40px',
        background: '#141414',
        borderRadius: '0px 0px 10px 10px',
        flex: 'none',
        order: '1',
        alignSelf: 'stretch',
        flexGrow: '0',
      },
    };
    const intervals = ['Time', '15m', '1H', '4H', '1D', '1W'];
    const data = intervals.map((element) => (
      <TimePicker key={uniqid()}>{element}</TimePicker>
    ));
    return <div style={styles.timeSwitch}>{data}</div>;
  };
  const TimePicker = (props) => {
    const { children } = props;
    const styles = {
      timePicker: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '10px 5px',
        gap: '10px',
        color: '#898989',
      },
      timePickerText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '17px',
        inlineHeight: '120%',
      },
    };
    return (
      <div style={styles.timePicker}>
        <span style={styles.timePickerText}>{children}</span>
      </div>
    );
  };

  const widget = (
    <PriceChart>
      <Display>
        <Header>
          <HeaderItem>BTC/USDT Price Chart</HeaderItem>
          <HeaderItem color={'#FFFFFF'}>23 Septemper 13:00</HeaderItem>
        </Header>
      </Display>
      <TimeSwitch />
    </PriceChart>
  );

  return widget;
};

export default Widget;
