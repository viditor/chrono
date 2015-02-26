var socket = io.connect("http://localhost:8080")

var Temporality = React.createClass({
    getInitialState: function() {
        return {
            assets: {}
        }
    },
    componentDidMount: function() {
        socket.on("add asset", this.onAddVideo)
    },
    onAddVideo: function(asset) {
        this.state.assets[asset.asset_id] = asset
        this.forceUpdate()
    },
    render: function() {
        return (
            <div id="content">
                <h2>Viditor</h2>
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
                    {asset}
                </div>
            )
        }
        return renderings
    }
})

React.render(<Temporality/>, document.body)
