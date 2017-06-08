const sqlManager = require('./sqlManager');
const mongoManager = require('./mongoManager');
const mongoose = require('mongoose');
const Talkback = require('./talkback');

class apiRoutes {
    static init(router) {
        router
            .get('/mainTopFour', function (req, res) {
                console.log('mainTopFour');
                let query = "SELECT TOP 1 [DestArticleID],[DisplayOrder],[Title],[PrimeTag],[SubTitle],[Strip" +
                        "eColor],[ServiceID],[HebServiceName],[MediaStockImageID],[MediaStockImageAlt],[M" +
                        "ediaStockImageCredit],[VideoID],2 as [DisplaySigns],[LastModifyDate],[LinkHref] " +
                        "FROM [BaseDB].[dbo].[TenTvAppFront_Main] union SELECT TOP 3 [DestArticleID],[Dis" +
                        "playOrder],[Title],[PrimeTag],[SubTitle],[StripeColor],[ServiceID],[HebServiceNa" +
                        "me],[MediaStockImageID],[MediaStockImageAlt],[MediaStockImageCredit],[VideoID] ," +
                        "10 as [DisplaySigns],[LastModifyDate],[LinkHref] FROM [BaseDB].[dbo].[TenTvAppFr" +
                        "ont_Main] where DisplayOrder between 2 and 4  order by DisplayOrder";
                let params = [res, req, query, true];
                sqlManager.runSqlPromise(...params);
            });

        router.get('/mainFeed', function (req, res) {
            console.log('mainFeed');
            let query = "select *from (select top 1000 Row_Number() over (order by DisplayOrder) as RowNu" +
                    "mber,*    from [TenTvAppFront_Main]) as PagedTable where RowNumber between 5 and" +
                    " 1000 order by DisplayOrder";
            let params = [res, req, query, true];
            sqlManager.runSqlPromise(...params);
        });

        router.get('/mainFeed/:ids', function (req, res) {
            let ids = req.params.ids;
            let query = "SELECT TOP 200 *,0 as DisplaySigns FROM [BaseDB].[dbo].[TenTvAppFront_ArticlesPe" +
                    "rServices] where ServiceID IN (" + ids + ") order by DestArticleId";
            let params = [res, req, query, true];
            sqlManager.runSqlPromise(...params);
        });

        router.get('/article/:id', function (req, res) {
            let id = req.params.id;
            let query = "SELECT TOP 200 *  FROM [BaseDB].[dbo].[TenTvAppFront_Article] where ArticleID=" + id + " order by ArticleID desc";
            let params = [res, req, query];
            sqlManager.runSqlPromise(...params);
        });

        // router.get('/article/talkback/:id', function (req, res) {
        //     //let id = req.params.id;
        //     let id = 428277;
        //     let query = "SELECT TOP 1000 * FROM [BaseDB].[dbo].[TenTvAppFront_Talkback] where ArticleID=" + id + " order by ArticleID desc";
        //     let params = [res, req, query];
        //     sqlManager.runSqlPromise(...params);
        // });
        /*monodb start*/

        router.get('/article/talkback/:id', function (req, res) {
            //let id = req.params.id;
            let id = 428277;
            let query = "SELECT TOP 1000 * FROM [BaseDB].[dbo].[TenTvAppFront_Talkback] where ArticleID=" + id + " order by ArticleID desc";
            let params = [res, req, query];
            mongoManager.runSqlPromise(...params);
        });
            


               //let 

                   // MyModel.save(); 
  
        /*mongodb end */
    }
}

module.exports = apiRoutes;