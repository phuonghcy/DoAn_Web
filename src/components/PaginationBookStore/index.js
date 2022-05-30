import { Pagination } from "react-bootstrap"
function PaginationBookStore({totalPage, currentPage, onChangePage}) {

    const handleClickPage = (e) => {
        const page = parseInt(e.target.getAttribute('data-page'))
        onChangePage(page)
    }

    const handlePrevPage = (e) => {
        onChangePage(currentPage - 1)
    }


    const handleNextPage = (e) => {
        onChangePage(currentPage + 1)
    }

    let items   = []

    if (currentPage > 1) {
        items.push(<Pagination.Prev key="prev" onClick={handlePrevPage} />)
    }
    for (let page = 1; page <= totalPage; page++) {
        items.push(
            <Pagination.Item onClick={handleClickPage} key={page} data-page={page} active={page === currentPage}>
                {page}
            </Pagination.Item>,
        )
    }

    if (currentPage < totalPage) {
        items.push(<Pagination.Next key="next" onClick={handleNextPage} />)
    }
  
    return (
        <Pagination>{items}</Pagination>
    )
}

export default PaginationBookStore