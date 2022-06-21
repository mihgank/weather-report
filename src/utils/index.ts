import moment from 'moment';

const dateTransform = (timestamp: number) => {
  moment.locale('RU');
  return moment(String(new Date(timestamp * 1000))).format('DD MMMM hh:mm');
};

export default dateTransform;
