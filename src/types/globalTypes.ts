/* eslint-disable @typescript-eslint/no-explicit-any */

import store from '../store/store'

/* eslint-disable max-len */
export type RouteType = {
  routeNumber:        number;
  floor:              string;
  id:                 number;
  title:              string;
  description?:       string;
  userName:           string;
  endDate:            Date;
  startDate:          Date;
  startTime:          string;
  endTime:            string;
  problemCount:       number;
  userRole:           string;
  secret:             string;
  itemId:             string;
};

export type AreaType = {
  id:                 number;
  routesId:           number;
  areaNumber:         string;
  roomName:           string;
};

export type TodoType = {
  areasId:            number;
  duty:               string;
  id:                 number;
};

export type PossibleProblemsType = {
  id:                 number;
  todoId:             number;
  possibleProblem:    string;
  reaction:           string;
};

export type HistoryDataType = {
  startDate:          string;
  startTime:          string;
  endDate:            string;
  endTime:            string;
  routeNumber:        number | undefined;
  id:                 number;
  userName:           string;
  problemCount:       number;
  pageID:             number;
  routenumber:        number;
  _id:                string;
  secret:             string;
  userRole:           string;
  filledData: {
    values: {
      [key: string]: {
        [key: string]: boolean
        }[]
    },
    pageID:           number;
    routeNumber:      number;
  }[]
  values: {
      [key: string]: {
        [key: string]: boolean;
      }[],
    },

};

export type UserType = {
  id:             number;
  email:          string;
  isAdmin:        boolean;
  isSecurity:     boolean;
  name:           string;
  username:       string;
  created:        Date;
  disabledDate:   Date;
  isDisabled:     boolean;
  _id:            string;
};

export type TokenType = {
  email:  string;
  exp:    number;
  iat:    number;
  userId: string;
};

export type ChecklistPhotosType = {
  photo:              string;
  photoId:            string;
}

export type ColocationDataType = {
  [key: string]: string[];
};

export type CompaniesType = {
  document:         string[]
  _id:              string;
  id:               number;
  parentId?: string;
  name:             string;
  racks:            string[]
  code:             string | undefined;
  description:      string;
  photo:            string;
  companyCode:      number
};

export type CompanyInfoType = {
  [site: string]: ColocationDataType[] | undefined;
} & {
  companyName: string;
  companyCode: string;
  companyDescription: string;
  companyPhoto: string;
  subClient?: {
    subClientId: string;
    subClientCompanyName: string;
  }[];
};
export type CompaniesSitesType = {
  _id:                string;
  id:                 string;
  CompanyId:          string;
  AvailableSites:     string;
}

export type CompaniesPremisesType = {
  _id:                string;
  id:                 string;
  siteId:             string;
  premiseName:        string;
}
export type CompaniesColocationType = {
  _id:                string;
  id:                 string;
  RackNumber:         string;
  PremiseId:          string;
  CompanyId:          string;
}

export type CompaniesEmlployeesType = {
  _id:                string;
  id:                 string;
  CompanyId:          string;
  employee_name:      string;
}

export type EmployeesType = {
  _id:            string;
  id:             string | undefined;
  companyId:      string | undefined;
  name:           string;
  lastname:       string;
  occupation:     string;
  permissions:    string[];
  photo?:         string | undefined;
  email?:         string;
  phone?:         string;
  birthday?:      Date;
  note?:          string;
  isDisabled:     boolean
  visitorIdType:  string;
}

export type CollocationType = {
  [key:string] : string[]
}

export type StatusType = 'success' | 'processing' | 'error' | 'default' | 'warning' | undefined;

export type VisitorsType = {
  idType?:            string | null | undefined;
  signature?:         string | undefined;
  selectedVisitor:    EmployeesType;
};

export type Visitors = {
  _id:            string;
  employeeId:     string;
  visitId:        string;
  visitorIdType: string;
}
export type ClientsGuests = {
  guestName: string;
  companyName?: string;
}
export interface Guest {
  name:     string
  company: string
}
export type VisitsType = {
    id:           string;
    _id:          string;
    companyId:    string | null;
    guests:       Guest[] | undefined;
    carPlates:    string[] | undefined
    racks:        string[] | undefined
    permissions:  string[]
    siteId:       string | null;
    visitPurpose: string[]
    date:         Date
    startDate:    Date
    endDate:      Date
    dlcEmlpyee:   string;
    statusId:     string;
}

export type CollocationsType = {
  id: number;
  premises: {
    premiseName: string;
    racks: string[]
  }[]
  site: string;
}

export type CollocationsSites = {
  [key: string]: Array<{
    [key: string]: string[];
  }>;
};

export type ModalStateType = {
  editClientsEmployee:       boolean;
  edit:                      boolean;
  openEmployeeAdditionModal: boolean;
  isCompanyAdded:            boolean;
  isModalOpen:               boolean;
}

export type FilterOptions = {
  filterName: string;
  filterOptions: {
      value: string | number;
      label: string;
  }[];
}[]

export type SubClientsCollocationsType = {
  site: string;
  id:   number;
  premises: {
      premiseName:  string;
      racks:        string[];
  }[];
}[]

export interface CheckedPremises {
  [premiseName: string]: string[];
}

export interface CheckedList {
  [site: string]: CheckedPremises[];
}

export interface CheckAllStates {
  [key: string]: boolean;
}

export interface State {
  checkedList:    CheckedList[];
  checkAllStates: CheckAllStates;
}

export interface Permissions {
  _id:  string
  name: string
}

export type Premises = {
  name:   string;
  siteId: string;
  _id:    string;
}

export type Racks = {
  id:         string | undefined;
  name:       string | undefined;
  _id:        string
  premiseId:  string
}

export type Sites = {
  name:       string;
  _id:         string;
}

export type VisitPurpose = {
  name:   string | undefined;
  _id:    string;
}

export type VisitorsIdTypes = {
  _id:  string;
  name: string;
}

export type VisitStatus = {
  _id:  string;
  name: string;
}
export interface VisitorEmployee extends Visitors {
  employee: EmployeesType
}

export type RootState = ReturnType<typeof store.getState>


export interface PremiseRacks extends Premises {
  racks: Racks[]
}
export interface FullSiteData extends Sites {
  premises: PremiseRacks[]
}

export interface CompanyDocuments {
  _id:        string;
  companyId:  string;
  path:       string;
  name:       string;
  format:     string;
}