const theme = {
  colors: {
    display: {
      header: { text: '#8D8D8D', date: '#FFFFFF' },
      data: { header: '#72ED93', value: '#FFFFFF' },
      chart: {
        bullish: '#72ED93',
        bearish: '#BC1C34',
        bullishSelected: '#CBFFD9',
        bearishSelected: '#ED6A7D',
      },
    },
    switch: { default: '#898989', selected: '#FFFFFF', background: '#141414' },
    link: { text: '#FFFFFF' },
  },
  font: {
    display: {
      fontFace: 'Roboto',
      header: {
        fontSize: '19px',
      },
      data: {
        header: {
          fontSize: '18px',
        },
        value: {
          fontSize: '30px',
        },
      },
    },
    switch: {
      fontSize: '17px',
    },
    link: {
      fontFace: 'Raleway',
      fontSize: '19px',
    },
  },
  mobileFont: {
    display: {
      header: {
        fontSize: '17px',
      },
      data: {
        header: {
          fontSize: '15px',
        },
        value: {
          fontSize: '24px',
        },
      },
    },
    switch: { fontSize: '17px' },
    link: {
      fontSize: '16px',
    },
  },
};

export default theme;
