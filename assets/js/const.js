const baseURL = 'https://bitcoin-wallet-server.onrender.com/'

const APIURL = 'https://api.blockcypher.com/v1/btc/main/'
const pushTX = APIURL + 'txs/push'
const balanceURL = APIURL + 'addrs/'

const explorTXURL = 'https://live.blockcypher.com/btc/tx/'

const unknown = 'An unknown error happend. please try later.'

var isConnected = false;
var attempts = 0
async function checkNetwork() {
      if (!isConnected) {
            $.ajax({
                  url: baseURL + 'status',
                  type: 'GET',
                  success: () => {
                        document.getElementById('status-signal').src = 'assets/images/statusok.svg'
                        document.getElementById('status-signal').title = 'Available'
                        isConnected = true
                  },
                  error: (err) => {
                        document.getElementById('status-signal').src = 'assets/images/statuserror.svg'
                        document.getElementById('status-signal').title = 'Unable to Connect'
                        console.error("Unable to cconnect to the server")
                        console.info(err)
                        if (attempts < 10) {
                              setTimeout(() => {
                                    attempts++
                                    checkNetwork()
                              }, 5000);
                        }

                  }
            })
      }
}



async function chechAccess() {
      await $.ajax({
            url: 'https://freeipapi.com/api/json',
            type: 'get',
            success: ((res) => {
                  if (res.countryName == 'Iran (Islamic Republic of)') {
                        window.location.href = 'accessdenied'
                  } else if (window.location.href == 'accessdenied') {
                        window.location.href = 'start'
                  } else {
                        let myW = $.cookie('__user-wa')
                        let myU = $.cookie('__user-un')
                        let myT = $.cookie('__auth-tk')

                        if (myW == undefined ||
                              myU == undefined ||
                              myT == undefined) {
                              window.location.href = 'start'
                        } else if (myW != undefined &&
                              myU != undefined &&
                              myT != undefined) {
                              window.location.href = 'dashboard'
                        }
                  }
            })
      })
}