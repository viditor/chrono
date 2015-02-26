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
            var asset = this.state.assets[asset_id];
            renderings.push(
                <div key={asset_id}>
                    {asset_id}. {asset.title}
                    ({asset.progress.toFixed(2) + "%"}))
                </div>
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

React.render(<Temporality/>, document.body)
