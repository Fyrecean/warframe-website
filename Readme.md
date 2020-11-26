# Waframe Relic Price Lookup
A website for looking up the items dropped by void relics along with the live prices of those items, updated from https://warframe.market/.
I created this tool so me and my friends could easily check which relics were worth using void traces on while playing Warframe. 

The live version can be found at: http://fyrecean.com. 

The API can be accessed at http://fyrecean.com:81/relic/[type]/[name] (Ex: http://fyrecean.com:81/relic/Lith/K1 )

Backend uses a MariaDB database to store relics, items, and prices which it serve up through the API.

Frontend uses React and fetches relic information from the backend and displays it.

Author: Carter Schmidt
