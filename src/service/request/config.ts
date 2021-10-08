let BASE_URL = ''
const BASE_TIMER_OUT = 3000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000/'
}
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
}

export { BASE_TIMER_OUT, BASE_URL }
