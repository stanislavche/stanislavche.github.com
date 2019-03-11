import React, { Component } from 'react';

class Donate extends Component {
	render() {
		return (
			<section className="container">
				<div className="container__wrapper">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
						<input type="hidden" name="cmd" value="_s-xclick" />
						<input type="hidden" name="hosted_button_id" value="5ZARN3FDGDL8Y" />
						<input type="image" src="https://www.paypalobjects.com/en_US/RU/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
						<img alt="" border="0" src="#" /*src="https://www.paypal.com/en_RU/i/scr/pixel.gif"*/ width="1" height="1" />
					</form>
				</div>
			</section>
		);
	}
}

export default Donate;