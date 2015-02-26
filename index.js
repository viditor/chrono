var Temporality = React.createClass({
	getInitialState: function() {
		return {
			videos: {
				1: "sadasd",
				2: "opgopfg"
			}
		}
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
    			<div>
    				{video}
    			</div>
			)
    	}
    	return renderings
    }
})

React.render(<Temporality/>, document.body)
