# nested GraphQL requests

If we have a parent and child component
parent makes gql query for one part of the data
child makes query for another part of the data

Then two queries are made

if child data is already available as the parent has got it then 
one query is made. 

Is it possible that the client can merge nested queries?

--
If two components in the same client request the same data then it is only fetched once and the result is returned from the cache.  So long as both requests include the same id

