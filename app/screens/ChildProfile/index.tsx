import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import moment from 'moment';
import NavigationService from 'app/navigation/NavigationService';
import {Header} from '../../components';
import LeftArrow from '../../assets/Svgs/LeftArrow.svg';
import {Typography} from '../../components/Typography';
import {StudentPod} from '../../components';
import {makeStyles} from './styles';
import {t} from '../../i18n';
import {useDispatch, useSelector} from 'react-redux';
import {loadingActions} from '../../store/features/loading/slice';
import {
  getChildrenDetails,
  getLeavesData,
  getParentDetailsOfChild,
} from '../../services/children';

const ChildProfile: React.FC = ({route}) => {
  const {childeInfo} = route.params;
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [isParentDetails, setIsParentDetails] = useState(false);
  const [childDetails, setChildDetails] = useState({});
  const [parentsDetails, setParentsDetails] = useState({});
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    dispatch(loadingActions.enableLoading());
    let childResponse = null;
    let leaveResponse = null;
    let parentResponse = null;
    const fetchData = async () => {
      childResponse = await getChildrenDetails(childeInfo.guid);
      leaveResponse = await getLeavesData(childeInfo.guid);
      parentResponse = await getParentDetailsOfChild(childeInfo.guid);
      dispatch(loadingActions.disableLoading());
      setChildDetails(childResponse?.body);
      setLeaves(leaveResponse?.body);
      setParentsDetails({
        father: parentResponse?.body[0],
        mother: parentResponse?.body[1],
      });
      console.log('response==22', childResponse, parentResponse);
    };
    fetchData();
    console.log('response==', childResponse, leaveResponse);
  }, []);
  const {colors} = useTheme();
  const styles = makeStyles(colors, isParentDetails);

  const _changeDetailsType = (isParent: boolean) => {
    setIsParentDetails(isParent);
  };

  const goBack = () => NavigationService.goBack();
  const gotoApplyLeave = () =>
    NavigationService.navigate('ApplyLeave', {childData: childeInfo});
  const gotoAttendanceSheet = () =>
    NavigationService.navigate('AttendanceSheet', {childData: childeInfo});
  const gotoTrack = () =>
    NavigationService.navigate('ApplyLeave', {childData: childeInfo});
  const gotoAbsentDays = () =>
    NavigationService.navigate('AbsentDays', {
      leavesData: leaves,
      childData: childeInfo,
    });
  if (isLoading) {
    return (
      <View style={styles.fullView}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (!childDetails) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('childProfile.title')}
        leftIcon={<LeftArrow />}
        leftIconPress={() => goBack()}
      />
      <View style={styles.fillBox} />
      <View style={styles.StudentPodContainer}>
        <StudentPod data={childeInfo} />
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={styles.attendanceTitleBox}>
          <Typography.H5Light style={{color: '#fff'}}>
            {t('childProfile.busAttendance')}
          </Typography.H5Light>
        </View>
        <View style={{width: '50%'}} />
      </View>
      <View style={styles.attendanceContainer}>
        <View style={styles.attendanceBox}>
          <Typography.H5>{t('childProfile.leavesTaken')}</Typography.H5>
          <Typography.H4>{leaves?.length}</Typography.H4>
          <Typography.H6Light onPress={gotoAbsentDays}>
            {t('childProfile.details')}
          </Typography.H6Light>
        </View>
        <View style={{width: '70%', paddingLeft: '4%'}}>
          <Typography.Link onPress={gotoApplyLeave}>
            {t('childProfile.applyLeave')}
          </Typography.Link>
          <Typography.Link onPress={gotoAttendanceSheet}>
            {t('childProfile.showAttendanceSheet')}
          </Typography.Link>
          <Typography.Link onPress={gotoTrack}>
            {t('childProfile.showBusRoute')}
          </Typography.Link>
        </View>
      </View>
      <View style={styles.tabButtonContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => _changeDetailsType(false)}>
          <Typography.H5 style={{color: isParentDetails ? '#000' : '#fff'}}>
            {t('childProfile.details')}
          </Typography.H5>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.parentDetails}
          onPress={() => _changeDetailsType(true)}>
          <Typography.H5 style={{color: isParentDetails ? '#fff' : '#000'}}>
            {t('childProfile.parentalDetails')}
          </Typography.H5>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.textBoxContainer}>
        {!isParentDetails ? (
          <>
            <TextInput
              label={t('childProfile.relationship')}
              placeholder={t('childProfile.relationship')}
              style={styles.textBox}
              value={childDetails?.detail?.relationShip}
            />
            <TextInput
              label={t('childProfile.admissionNum')}
              placeholder={t('childProfile.admissionNum')}
              style={styles.textBox}
              value={childDetails?.detail?.admission_id}
            />
            <TextInput
              label={t('childProfile.admissionDate')}
              placeholder={t('childProfile.admissionDate')}
              style={styles.textBox}
              value={
                childDetails.detail?.admission_date &&
                moment(childDetails.detail?.admission_date).format(
                  'DD-MMM-YYYY',
                )
              }
            />
            <TextInput
              label={t('childProfile.rollNumber')}
              placeholder={t('childProfile.rollNumber')}
              style={styles.textBox}
              value={childDetails?.detail?.roll_no}
            />
            <TextInput
              label={t('childProfile.dob')}
              placeholder={t('childProfile.dob')}
              style={styles.textBox}
              value={
                childDetails?.detail?.dob &&
                moment(childDetails?.detail?.dob).format('DD-MMM-YYYY')
              }
            />
            {childDetails?.perm_addr?.addr_line1 && (
              <TextInput
                label={t('childProfile.permanentAddress')}
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.perm_addr?.addr_line1}
              />
            )}
            {childDetails?.perm_addr?.addr_line2 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.perm_addr?.addr_line2}
              />
            )}
            {childDetails?.perm_addr?.addr_line3 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.perm_addr?.addr_line3}
              />
            )}
            {childDetails?.perm_addr?.addr_line4 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.perm_addr?.addr_line4}
              />
            )}
            {childDetails?.postal_addr?.addr_line1 && (
              <TextInput
                label={t('childProfile.postalAddress')}
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.postal_addr?.addr_line1}
              />
            )}
            {childDetails?.postal_addr?.addr_line2 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.postal_addr?.addr_line2}
              />
            )}
            {childDetails?.postal_addr?.addr_line3 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.postal_addr?.addr_line3}
              />
            )}
            {childDetails?.postal_addr?.addr_line4 && (
              <TextInput
                placeholder={t('childProfile.address')}
                style={styles.textBox}
                value={childDetails?.postal_addr?.addr_line4}
              />
            )}
          </>
        ) : (
          <>
            <TextInput
              label={t('childProfile.fatherName')}
              placeholder={t('childProfile.fatherName')}
              style={styles.textBox}
              value={parentsDetails?.father.name}
            />
            <TextInput
              label={t('childProfile.contactNum')}
              placeholder={t('childProfile.contactNum')}
              style={styles.textBox}
              value={parentsDetails?.father.contact_number}
            />
            <TextInput
              label={t('childProfile.email')}
              placeholder={t('childProfile.email')}
              style={styles.textBox}
              value={parentsDetails?.father.email}
            />
            <TextInput
              label={t('childProfile.mothersName')}
              placeholder="Mother’s Name"
              style={styles.textBox}
              value={parentsDetails?.mother.name}
            />
            <TextInput
              label={t('childProfile.contactNum')}
              placeholder={t('childProfile.contactNum')}
              style={styles.textBox}
              value={parentsDetails?.mother.contact_number}
            />
            <TextInput
              label={t('childProfile.email')}
              placeholder={t('childProfile.email')}
              style={styles.textBox}
              value={parentsDetails?.mother.email}
            />
            <TextInput
              label={t('childProfile.address')}
              placeholder={t('childProfile.address')}
              style={styles.textBox}
              value={parentsDetails?.address1}
            />
            <TextInput
              placeholder={t('childProfile.address')}
              style={styles.textBox}
              value={parentsDetails?.address2}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ChildProfile;
