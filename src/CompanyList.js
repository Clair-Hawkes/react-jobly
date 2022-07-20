import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import JoblyApi from './api';

import { useState, useEffect } from 'react';


/** CompanyList for displaying companies
 *
 * Props: None
 *
 * State:
 * - companies: [{company}, ...]
 * - searchTerms
 *
 * Routes -> CompanyList -> { SearchForm, CompanyCard }
 */

function CompanyList() {
  const [companies, setCompanies] = useState({
    data: [],
    isLoading: true,
  });
  const [searchTerms, setSearchTerms] = useState();
  console.log("CompanyList", companies, searchTerms);


  useEffect(function fetchCompaniesOnSearchTermsChange() {
    async function fetchCompanies() {
      const companiesResult = await JoblyApi.getCompanies(searchTerms)
      setCompanies({
        data: companiesResult,
        isLoading: false
      });
    }
    fetchCompanies();
  }, [searchTerms]);


  //TODO: RENAME PARAM
  // {name: 'search terms' } 
  function searchCompanies(searchBarValue) {
    setSearchTerms(searchBarValue);
  }


  return (
    <div>
      <header>COMPANY LISTER</header>
      <SearchForm 
        searchFunction={searchCompanies} 
        searchField='name'
      />
      {companies.isLoading
        ? <p>Loading!</p>
        : companies.data.map(
          company => <CompanyCard key={company.handle} company={company} />
        )
      }
    </div>
  );
}

export default CompanyList;


// THinking Space:
// Have to get the props
// Map the props to create
