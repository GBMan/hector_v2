class DatasHolder {
    constructor() {
        if (DatasHolder.instance == null) {
            this.datas = null;
            this.instance = this;
            this.prevDatas = {};
            this.prevRailRoad = {};
        }
        return DatasHolder.instance;
    }

    getDatas() {
        return this.datas;
    }

    getDatasFromRoute(route) {
        if (!this.datas || this.datas.length === 0) return null;
        if (this.prevDatas[route]) return this.prevDatas[route];

        const aRouteBrut = route.split("/");
        const aRouteClean = (aRouteBrut[0] === "") ? aRouteBrut.splice(1) : aRouteBrut;
        const datas = this.searchDatasDeep(aRouteClean, this.datas)
        this.prevDatas[route] = datas;

        return datas;
    }
    searchDatasDeep(aRouteClean, groupes, deep = 0) {
        const groupe = groupes.find((groupe) => {
            return (groupe.idRoute === aRouteClean[deep]);
        });
        deep++;
        if (!groupe) return groupes;
        if (aRouteClean.length > deep) {
            if (groupe.hasOwnProperty("groupes")) {
                return this.searchDatasDeep(aRouteClean, groupe.groupes, deep);
            }
            else {
                if (groupe.hasOwnProperty("images")) {
                    return groupe.images;
                }
            }
        }
        else {
            if (groupe.hasOwnProperty("images")) {
                return groupe.images;
            }
            else {
                return groupe.groupes;
            }
        }
    }

    getRailRoadFromRoute(route) {
        if (!route || !this.datas || this.datas.length === 0) return null;
        if (this.prevRailRoad[route]) return this.prevRailRoad[route];

        const aRouteBrut = route.split("/");
        const aRouteClean = (aRouteBrut[0] === "") ? aRouteBrut.splice(1) : aRouteBrut;
        const railRoad = this.searchRailRoadDeep(aRouteClean, this.datas);
        this.prevRailRoad[route] = railRoad;

        return railRoad;
    }
    searchRailRoadDeep(aRouteClean, groupes, railRoad = [], deep = 0) {
        const groupe = groupes.find((groupe) => {
            return (groupe.idRoute === aRouteClean[deep]);
        });
        if (!groupe) return railRoad;
        let newRailRoad = [...railRoad, { title: groupe.title, route: groupe.route }];
        deep++;
        if (aRouteClean.length > deep && groupe.hasOwnProperty("groupes")) {
            newRailRoad = this.searchRailRoadDeep(aRouteClean, groupe.groupes, newRailRoad, deep);
        }
        return newRailRoad;
    }

    setDatas(datas) {
        this.datas = datas;
    }

    print() {
        console.log(this.datas);
    }
}

const datasHolder = new DatasHolder();
// Object.freeze(datasHolder);
export default datasHolder;