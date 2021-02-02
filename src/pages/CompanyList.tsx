import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/companies/Card';
import { getCompanies } from '../reducks/companies/selecors';
import { fetchCompanies } from '../reducks/companies/operations';
import { CompanyType } from '../reducks/companies/types';

const CompanyList: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const companies = getCompanies(selector);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 md:px-0">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        {companies.list && companies.list.map((item: CompanyType) => (
          <Card company={item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
