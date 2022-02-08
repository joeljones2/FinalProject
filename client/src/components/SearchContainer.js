import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    roomidOptions,
    deskidOptions,
  } = useAppContext()
  
  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search room */}

          <FormRow
            type='room'
            name='searchRoom'
            value={search}
            handleChange={handleSearch}
            list={['all', ...roomidOptions]}
          />
          {/* search desk */}
          <FormRowSelect
            labelText='desk'
            name='searchDesk'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...deskidOptions]}
          />
          {/* search by date */}
          <FormRowSelect
            labelText='date'
            name='searchDate'
            value={searchType}
            handleChange={handleSearch}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer