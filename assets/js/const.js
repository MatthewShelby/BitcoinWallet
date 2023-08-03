const baseURL = 'https://bitcoin-wallet-server.onrender.com/'
const APIURL = 'https://api.blockcypher.com/v1/btc/test3/'
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

async function ipLookUp() {
      $.get('https://ip8.com/ip').done(ip => { console.log(ip) }).fail(err => { console.error(err) })

}

async function chechAccess() {
      await $.ajax({
            // url: 'https://ip8.com/ip',
            url: 'https://freeipapi.com/api/json',
            type: 'get',
            success: ((res) => {
                  console.log('ip: ')
                  console.info(res)
                  console.info(res.countryName)
                  if (res.countryName == 'Iran (Islamic Republic of)') {
                        window.location.href = './accessdenied'
                  }
            })
      })
}