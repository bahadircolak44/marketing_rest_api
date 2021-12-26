import http from "./../utils/axios";

const api = {
    getCampaigns() {
        return http.get('/facebook/campaign').then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },
    addCampaign(data) {
        return http.post('/facebook/campaign/', data).then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },



    getAdSets() {
        return http.get('/facebook/adset').then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },
    addAdSets(data) {
        return http.post('/facebook/adset/', data).then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },



    getAds() {
        return http.get('/facebook/ad').then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },
    addAd(data) {
        return http.post('/facebook/ad/', data).then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },



    getInsights() {
        return http.get('/facebook/adset/insights/').then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },



    getPreview() {
        return http.get('/facebook/ad/preview/').then((response) => {
            return Promise.resolve(response.data)
        }).catch((err) => {
            return Promise.resolve(err.response.data)
        })
    },
}
export default api;