const baseURL = 'http://127.0.0.1:3001/'
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