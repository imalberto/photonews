/** @jsx React.DOM */
<div className="pure-g-r">
  <a data-page={this.props.prev} href={'/photo/' + this.props.prev} className="left-arrow" />
  <div className="photo-container">
    <div className="photo-image">
      <img src={this.props.photo.url} />
    </div>
  </div>
  <a data-page={this.props.next} href={'/photo/' + this.props.next} className="right-arrow" />
</div>
