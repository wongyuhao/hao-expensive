import React from 'react';
import ReactPaginate from 'react-paginate'
export default(props) => {
  const pageCount = Math.ceil(props.totalCount / props.perpage)

   return (
       <div className='flex flex-col justify-center md:flex-row md:justify-between px-2 bottom pt-3'>
         <div>
          {(props.totalCount < props.perpage) ? <></> :
          <ReactPaginate
          initialPage={0}
          previousLabel={props.currpage === 0 ? '⛔': '◀'}
          nextLabel={props.currpage === pageCount-1 ? '⛔': '▶'}
          breakLabel={'...'}
          breakClassName={'rp-break'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={e => props.handlePaginateClick(e)}
          containerClassName={'rp-pagination'}
          activeClassName={'rp-active'}
          pageClassName={'rp-pageli'}
          pageLinkClassName ={'rp-pagea'}
          previousClassName={`rp-arrow`}
          nextClassName={`rp-arrow`}
        />}
         
         </div>
        <div className='text-sm text-gray-600 mx-auto md:mr-0'>
         {props.totalCount} items total. Showing {props.perpage} per page. 
         </div>
       </div>
   )
}