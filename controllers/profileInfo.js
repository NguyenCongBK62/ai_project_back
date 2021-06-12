const { attachPaginate } = require('knex-paginate');
attachPaginate();
const handleProfileInfo = (req, res, db) => {
    if (req.query.name_like == null) {
        var pagination = {};
        pageSize = req.query._limit;
        pageNumber = req.query._page;
        db('person').count('* as count').first().then(res => {
            pagination._page = parseInt(pageNumber);
            pagination._limit = parseInt(pageSize);
            pagination._totalRows = parseInt(Math.ceil(res.count / pageSize));
        });



        db('person').select().paginate({
            perPage: pageSize,
            currentPage: pageNumber
        }).then(response => {

            res.status(200).json({
                success: true,
                data: response,
                pagination: pagination,
            });
        })
    }
    else {
        var name = req.query.name_like;
        var idno = req.query.idno_like;
        var planeid = req.query.planeid_like;
        var pagination = {};
        pageSize = req.query._limit;
        pageNumber = req.query._page;
        db('person').count('* as count').where('name', 'like', `%${name}%`)
        .andWhere('idno', 'like', `%${idno}%`)
        .orWhere('planeid', 'like', `%${planeid}%`)
        .first().then(res => {
            pagination._page = parseInt(pageNumber);
            pagination._limit = parseInt(pageSize);
            pagination._totalRows = parseInt(Math.ceil(res.count / pageSize));
            console.log(pagination);
        });
        db('person').select()
        .where('name', 'like', `%${name}%`)
        .andWhere('idno', 'like', `%${idno}%`)
        .orWhere('planeid', 'like', `%${planeid}%`)
        .paginate({
            perPage: parseInt(pageSize),
            currentPage: parseInt(pageNumber)
        }).then(response => {

            res.status(200).json({
                success: true,
                data: response,
                pagination: pagination,
            });
        })

    }
}

module.exports = {
    handleProfileInfor: handleProfileInfo
};