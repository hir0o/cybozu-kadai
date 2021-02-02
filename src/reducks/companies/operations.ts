import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/index';
import { fetchCompaniesAction } from './actions';
import { CompanyType } from './types';

const companiesRef = db.collection('companies');

export const fetchCompanies = () => async (dispatch: any) => {
  // TODO: 降順で取得する
  companiesRef.get()
    .then((snapshots) => {
      const companyList: CompanyType[] = [];
      // TODO: mapとかを使った方がいい
      snapshots.forEach((snapshot) => {
        const company: CompanyType = snapshot.data() as CompanyType; // TODO: 無理やり
        companyList.push(company);
      });

      dispatch(fetchCompaniesAction(companyList));
    });
};

export const saveCompany = (company: CompanyType, id: string) => async (dispatch: any) => {
  const timestamp = FirebaseTimestamp.now().toDate();
  const data = {
    ...company,
    updated_at: timestamp,
  };

  // editじゃなかったら，
  if (id === '' || id === undefined) {
  // firebaseで自動付与されるidを取得
    const ref = companiesRef.doc();
    data.id = ref.id;
    data.created_at = timestamp;
  }

  console.log(data);

  return companiesRef.doc(data.id).set(data, { merge: true })
    .then(() => {
      dispatch(push('/'));
    }).catch((error) => {
      throw new Error(error);
    });
};
