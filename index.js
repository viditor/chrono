var socket = io.connect("http://localhost:8080")

var Temporality = React.createClass({
    getInitialState: function() {
        return {
            videos: {}
        }
    },
    componentDidMount: function() {
        socket.on("establish connection", function() {
            console.log("connection established!!")
        })
        socket.on("add video", this.onAddVideo)
    },
    onAddVideo: function(video_id, video) {
        this.state.videos[video_id] = video
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
        for(var video_id in this.state.videos) {
            var video = this.state.videos[video_id];
            renderings.push(
                <div key={video_id}>
                    {video}
                </div>
            )
        }
        return renderings
    }
})

React.render(<Temporality/>, document.body)
