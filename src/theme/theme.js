const theme = {
  colors: {
    display: {
      header: { text: '#72ED93', date: '#FFFFFF' },
      data: { header: '#8D8D8D', value: '#FFFFFF' },
      chart: {
        bullish: '#72ED93',
        bearish: '#BC1C34',
        bullishSelected: '#CBFFD9',
        bearishSelected: '#ED6A7D',
      },
    },
    switch: { default: '#898989', selected: '#FFFFFF', background: '#141414' },
    link: '#FFFFFF',
  },
  fonts: {
    main: 'Roboto',
    secondary: 'Raleway',
    display: {
      header: '19px',
      data: '18px',
      value: '30px',
    },
    switch: '17px',
    link: '19px',
  },
  mobileFonts: {
    display: {
      header: '17px',
      data: '15px',
      value: '24px',
    },
    switch: '17px',
    link: '16px',
  },
};

export default theme;
