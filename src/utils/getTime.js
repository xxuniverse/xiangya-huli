export default function formatDuring (mss) {
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = parseInt((mss % (1000 * 60)) / 1000)
  return {
    h: hours,
    m: minutes,
    s: seconds
  }
  // hours+"小时"+minutes+"分钟"+seconds+"秒";
}
