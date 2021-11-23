const router = require('express').Router();
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
     host: 'localhost:9200',
     log: 'error'
});

router.route('/').post((req, res) => {
     let search = req.body
     // console.log(search)
     if (!search.search) {
          return res.status(400).json({ error: 'Enter Input' });
     }
     else {
          if (search.multi == true) {
               var fieldlist = []
               if (search.author == true) {
                    fieldlist.push('author')
               }
               if (search.field == true) {
                    fieldlist.push('journal')
               }
               // console.log(fieldlist)
               let body = {
                    size: 5,
                    from: 0,
                    query: {
                         bool: {
                              must: [
                                   {
                                        range: {
                                             yearofpublish: {
                                                  lte: search.to,
                                                  gte: search.from
                                             }
                                        }
                                   }
                              ],
                              should: [
                                   {
                                        multi_match: {
                                             query: search.search,
                                             fields: fieldlist,
                                             minimum_should_match: 1,
                                             fuzziness: 2
                                        }
                                   }
                              ],
                              must_not: []
                         }
                    }
               };
               //search('library', body)
               // console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
               esClient.search({ index: 'reddit-for-research', body: body })
                    .then(results => {
                         // console.log(`found ${results.hits.total} items in ${results.took}ms`);
                         // console.log(`returned article titles:`);
                         // console.log(results.hits.hits);
                         return res.json(results.hits.hits)//.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
                    })
                    .catch(console.error);
          }
          else {
               // console.log('lmao')
               let body = {
                    size: 5,
                    from: 0,
                    query: {
                         bool: {
                              must: [
                                   {
                                     range: {
                                       yearofpublish: {
                                         lte: search.to,
                                         gte: search.from
                                       }
                                     }
                                   }
                              ],
                              should: [
                                   {
                                        match: {
                                             name: {
                                                  query: search.search,
                                                  minimum_should_match: 2,
                                                  fuzziness: 2
                                             }
                                        }
                                   }
                              ],
                              must_not: [
                              ]
                         }
                         // match: {
                         //      title: {
                         //           query: search.search,
                         //           minimum_should_match: 3,
                         //           fuzziness: 2
                         //      }
                         // }
                    }
               };
               //search('library', body)
               // console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
               esClient.search({ index: 'reddit-for-research', body: body })
                    .then(results => {
                         // console.log(`found ${results.hits.total} items in ${results.took}ms`);
                         // console.log(`returned article titles:`);
                         // console.log(results.hits.hits);
                         return res.json(results.hits.hits)//.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
                    })
                    .catch(console.error);
          }
     }
});
// router.route('/authorautocomplete').post((req, res) => {
//      let search = req.body
//      // console.log(search)
//      if (!search.search) {
//           return res.status(400).json({ error: 'Enter Input' });
//      }
//      else {
//           // console.log('lmao')
//           let body = {
//                size: 5,
//                from: 0,
//   "suggest": {
//     "reddit-for-research": {
//       "prefix": search.search,
//       "completion": {
//         "field": "author",
//         "fuzzy": {
//           "fuzziness": 1
//         }
//       }
//     }
//   }
//           };
//           //search('library', body)
//           // console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
//           esClient.search({ index: 'reddit-for-research', body: body })
//           .then(results => {
//                // console.log(`found ${results.hits.total} items in ${results.took}ms`);
//                // console.log(`returned article titles:`);
//                // console.log(results.hits.hits);
//                return res.json(results.hits.hits)//.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
//           })
//           .catch(console.error);
//      }
// });

router.route('/author').post((req, res) => {
     let search = req.body
     // console.log(search)
     if (!search.search) {
          return res.status(400).json({ error: 'Enter Input' });
     }
     else {
          // console.log('lmao')
          let body = {
               size: 5,
               from: 0,
               query: {
                    bool: {
                         must: [
                         ],
                         should: [
                              {
                                   match: {
                                        author: {
                                             query: search.search,
                                             // minimum_should_match: 2,
                                             // fuzziness: 2
                                        }
                                   }
                              }
                         ],
                         must_not: [
                         ]
                    }
                    // match: {
                    //      title: {
                    //           query: search.search,
                    //           minimum_should_match: 3,
                    //           fuzziness: 2
                    //      }
                    // }
               }
          };
          //search('library', body)
          // console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
          esClient.search({ index: 'reddit-for-research', body: body })
          .then(results => {
               // console.log(`found ${results.hits.total} items in ${results.took}ms`);
               // console.log(`returned article titles:`);
               // console.log(results.hits.hits);
               return res.json(results.hits.hits)//.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
          })
          .catch(console.error);
     }
});

router.route('/field').post((req, res) => {
     let search = req.body
     // console.log(search)
     if (!search.search) {
          return res.status(400).json({ error: 'Enter Input' });
     }
     else {
          // console.log('lmao')
          let body = {
               size: 5,
               from: 0,
               query: {
                    bool: {
                         must: [
                         ],
                         should: [
                              {
                                   match: {
                                        field: {
                                             query: search.search,
                                             // minimum_should_match: 2,
                                             // fuzziness: 2
                                        }
                                   }
                              }
                         ],
                         must_not: [
                         ]
                    }
                    // match: {
                    //      title: {
                    //           query: search.search,
                    //           minimum_should_match: 3,
                    //           fuzziness: 2
                    //      }
                    // }
               }
          };
          //search('library', body)
          // console.log(`retrieving all documents (displaying ${body.size} at a time)...`);
          esClient.search({ index: 'reddit-for-research', body: body })
          .then(results => {
               // console.log(`found ${results.hits.total} items in ${results.took}ms`);
               // console.log(`returned article titles:`);
               // console.log(results.hits.hits);
               return res.json(results.hits.hits)//.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
          })
          .catch(console.error);
     }
});

module.exports = router;
