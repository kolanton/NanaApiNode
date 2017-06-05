const sqlManager = require('./sqlManager');

class apiRoutes {
    static init(router) {
        router.get('/mainTopFour', function (req, res) {
            console.log('mainTopFour');
            let query = "SELECT TOP 1 [DestArticleID],[DisplayOrder],[Title],[PrimeTag]" +
                ",[SubTitle],[StripeColor],[ServiceID],[HebServiceName],[MediaStockImageID]" +
                ",[MediaStockImageAlt],[MediaStockImageCredit],[VideoID],2 as [DisplaySigns]" +
                ",[LastModifyDate],[LinkHref] FROM [BaseDB].[dbo].[TenTvAppFront_Main] union " +
                "SELECT TOP 3 [DestArticleID],[DisplayOrder],[Title],[PrimeTag],[SubTitle]" +
                ",[StripeColor],[ServiceID],[HebServiceName],[MediaStockImageID],[MediaStockImageAlt]" +
                ",[MediaStockImageCredit],[VideoID] ,10 as [DisplaySigns],[LastModifyDate],[LinkHref]" +
                " FROM [BaseDB].[dbo].[TenTvAppFront_Main] where DisplayOrder between 2 and 4  order by DisplayOrder";
            let params = [res, req, query, true];
            sqlManager.runSqlPromise(...params);
        });

        router.get('/mainFeed', function (req, res) {
            console.log('mainFeed');
            let query = "select *" +
                "from (select top 1000 Row_Number() over (order by DisplayOrder) as RowNumber," +
                "*    from [TenTvAppFront_Main]) as PagedTable where RowNumber between 5 and 1000 order by DisplayOrder";
            let params = [res, req, query, true];
            sqlManager.runSqlPromise(...params);
        });

        router.get('/mainFeed/:ids', function (req, res) {
            let ids = req.params.ids;
            let query = "SELECT TOP 200 *,0 as DisplaySigns FROM [BaseDB].[dbo].[TenTvAppFront_ArticlesPerServices] where ServiceID IN (" + ids + ") order by DestArticleId";
            let params = [res, req, query, true];
            sqlManager.runSqlPromise(...params);
        });


        router.get('/article/:id', function (req, res) {
            let id = req.params.id;
            let query = "SELECT TOP 200 *  FROM [BaseDB].[dbo].[TenTvAppFront_Article] where ArticleID=" + id + " order by ArticleID desc";
            let params = [res, req, query];
            sqlManager.runSqlPromise(...params);
        });
    }
}

module.exports = apiRoutes;