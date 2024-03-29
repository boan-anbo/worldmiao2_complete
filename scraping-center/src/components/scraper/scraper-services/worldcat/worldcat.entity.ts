export enum DatabaseNames {
  INTERNET_ARCHIVE = 'Internet Archive',
  HATHI_TRUST = 'HathiTrust',
  EBSCO = 'EBSCO',
  TAYLOR_FRANCIS = 'Taylor & Francis',
  VLE_BOOKS = 'VLeBooks',
  HOOPLA = 'hoopla',
  SPRINGER = 'Springer',
  BRILL = 'Brill'
}
export class Database {
  // standard name
  name: string | DatabaseNames = ''

  link?: string = ''

  // label used by WorldCat
  worldcatLabel: string = ''
}

export const defaultDatabaseMap: Database[] = [
  {
    worldcatLabel: 'EBSCOhost',
    name: DatabaseNames.EBSCO,
  }, {
    worldcatLabel: 'MyiLibrary',
    name: 'MyiLibrary',
  },
  {
    worldcatLabel: 'OverDrive',
    name: 'OverDrive',
  },
  {
    worldcatLabel: 'ProQuest Ebook Central',
    name: 'ProQuest Ebook Central',
  },
  {
    worldcatLabel: 'histories.cambridge.org',
    name: 'Cambridge Online',
  },
  {
    worldcatLabel: 'find.galegroup.com',
    name: 'Gale Group',
  },
  {
    worldcatLabel: 'Internet Archive',
    name: DatabaseNames.INTERNET_ARCHIVE,
  },
  {
    worldcatLabel: 'Google',
    name: 'Google',
  },
  {
    worldcatLabel: 'ebookcentral.proquest.com',
    name: 'Proquest',
  },
  {
    worldcatLabel: 'ebrary',
    name: 'Ebrary',
  },
  {
    worldcatLabel: 'heinonline.org',
    name: 'HeinOnline',
  },
  {
    worldcatLabel: 'archive.org',
    name: DatabaseNames.INTERNET_ARCHIVE,
  },
  {
    worldcatLabel: 'HathiTrust Digital Library, Full view',
    name: DatabaseNames.HATHI_TRUST,
  },
  {
    worldcatLabel: 'search.ebscohost.com',
    name: DatabaseNames.EBSCO,
  },
  {
    worldcatLabel: 'HathiTrust Digital Library, Limited view (search only)',
    name: DatabaseNames.HATHI_TRUST,
  },
  {
    worldcatLabel: 'HathiTrust Digital Library',
    name: DatabaseNames.HATHI_TRUST,
  },
  {
    worldcatLabel: 'taylorfrancis.com',
    name: DatabaseNames.TAYLOR_FRANCIS,
  },
  {
    worldcatLabel: 'VLeBooks',
    name: DatabaseNames.VLE_BOOKS,
  },
  {
    worldcatLabel: 'hoopla',
    name: DatabaseNames.HOOPLA,
  },
  {
    worldcatLabel: 'search.ebscohost.com',
    name: DatabaseNames.EBSCO,
  },
  {
    worldcatLabel: 'SpringerLink',
    name: DatabaseNames.SPRINGER,
  },
  {
    worldcatLabel: 'Brill',
    name: DatabaseNames.BRILL,
  },

];
