import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllData } from 'actions/app'

import BookDetailsPage from 'components/Books/BookDetailsPage'



class BookDetailsPageContainer extends Component {
	render() {
		return (
			<BookDetailsPage {...this.props} />
		)
	}
}

function mapStateToProps(state) {
	return {
		books: state.app.books,
		authors: state.app.authors,
		genres: state.app.genres,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAllData: bindActionCreators(getAllData, dispatch)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPageContainer)