var socket = io.connect("http://localhost:8080")

var Temporality = React.createClass({
    getInitialState: function() {
        return {
            assets: {}
        }
    },
    componentDidMount: function() {
        socket.on("add asset", this.onSetAsset)
        socket.on("update asset", this.onSetAsset)
    },
    onSetAsset: function(asset) {
        console.log(asset)
        this.state.assets[asset.asset_id] = asset
        this.forceUpdate()
    },
    render: function() {
        return (
            <div>
                <h2>Viditor</h2>
                <form onSubmit={this.onSubmitAsset}>
                    <input ref="ytid" type="text"/>
                    <input type="submit"/>
                </form>
                {this.renderVideos()}
            </div>
        )
    },
    renderVideos: function() {
        var renderings = []
        for(var asset_id in this.state.assets) {
            var asset = this.state.assets[asset_id]
            renderings.push(
                <Asset key={asset_id}
                    data={asset}/>
            )
        }
        return renderings
    },
    onSubmitAsset: function(event) {
        event.preventDefault()
        var youtube_id = this.refs.ytid.getDOMNode().value
        socket.emit("add asset from youtube", youtube_id)
    }
})

var Asset = React.createClass({
    render: function() {
        return (
            <div className="asset">
                {this.renderThumbnail()}
                {this.renderTitle()}
                {this.renderProgress()}
            </div>
        )
    },
    renderThumbnail: function() {
        if(this.props.data.thumbnail != undefined) {
            var thumbnail = "url(" + this.props.data.thumbnail + ")"
            return (
                <div className="thumbnail" style={{backgroundImage: thumbnail}}/>
            )
        }
    },
    renderTitle: function() {
        return (
            <b className="title">
                {this.props.data.title}
            </b>
        )
    },
    renderProgress: function() {
        if(this.props.data.progress < 100)
        {
            var progress = this.props.data.progress.toFixed(2) + "%"
            return (
                <div className="progress">
                    <div className="bar" style={{width: progress}}/>
                    <div className="text">{progress}</div>
                </div>
            )
        }
    }
})

React.render(<Temporality/>, document.body)
