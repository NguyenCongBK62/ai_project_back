const handleProfileInput = (req, res, db) => {
    const {name, address, idNo, planeId} = req.body;
    if(!name || !address || !idNo || !planeId){
        return res.status(400).json('incorrect form submission');
    }
    
    db('person').insert({
            name: name,
            address: address,
            idno: idNo,
            planeid: planeId,
            date: new Date()
        }).returning('*').then(person => {
            res.json(person[0]);
        }).catch(err => res.status(400).json('not submit'));
}

module.exports = {
    handleProfileInput: handleProfileInput
};