import { useEffect } from "react"


function App() {

  useEffect(() => {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.action.setBadgeText({
        text: "OFF"
      })
    })
  }, [])

  useEffect(() => {
    chrome.action.onClicked.addListener(async (tab) => {
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id })

      const nextState = prevState === 'ON' ? 'OFF' : 'ON'

      const data = await chrome.search.query({
        disposition: 'CURRENT_TAB',
        text: "agnezi",
        tabId: tab.id,
      })

      console.log('data', data)

      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      })
    })
  }, [])

  return (
    <div>
      <h1>Olha ai</h1>
    </div>
  )
}

export default App
