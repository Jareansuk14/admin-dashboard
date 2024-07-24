// Table.js
import React, { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TAB_LABELS = ['ตรวจความถูกต้อง', 'พิจารณาเอกสาร', 'ขึ้นทะเบียน', 'ออกเอกสาร', 'แก้ไข'];
const TABLE_HEADERS = ['ชื่อหน่วยงาน', 'รหัสหน่วยบริการ', 'วันที่ขึ้นทะเบียน', 'ชื่อผู้ตรวจสอบ', 'วันที่ตรวจสอบ', 'สถานะ'];

const getStatusColor = (status) => {
    const statusColors = {
        'รอตรวจสอบ': '#A6DFEB',
        'พิจารณาเอกสาร': '#F9D876',
        'ขึ้นทะเบียน': '#94C973',
        'ออกเอกสาร': '#FF8976',
        'default': '#FEB06A',
    };
    return statusColors[status] || statusColors['default'];
};

const MenuTab = ({ value, onChange }) => (
    <Tabs
        value={value}
        onChange={onChange}
        sx={{
            mb: 3,
            borderRadius: '8px 8px 0 0',
            bgcolor: '#f1f1f1',
            '& .MuiTab-root': { textTransform: 'none', minWidth: 100 },
            '& .Mui-selected': { bgcolor: '#fff', borderRadius: '8px 8px 0 0', fontWeight: 'bold' }
        }}
    >
        {TAB_LABELS.map(label => (
            <Tab key={label} label={label} />
        ))}
    </Tabs>
);

const SearchField = ({ searchTerm, setSearchTerm }) => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <TextField
            placeholder="ค้นหา"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
                width: { xs: '100%', sm: '30%' },
                bgcolor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': { borderRadius: '20px' }
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    </Box>
);

const DataTable = ({ data, searchTerm }) => (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
            <TableHead>
                <TableRow>
                    {TABLE_HEADERS.map(header => (
                        <TableCell key={header} align="center" sx={{ fontSize: '0.875rem' }}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.verifyBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.verifyDate.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((item, index) => (
                    <TableRow key={index}>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>{item.name}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>{item.code}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>{item.createDate}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>{item.verifyBy}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>{item.verifyDate}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    fontSize: '0.75rem',
                                    width: '130px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    bgcolor: getStatusColor(item.status),
                                    color: '#000',
                                    '&:hover': {
                                        color: '#FFF',
                                    }
                                }}
                            >
                                {item.status}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const TableComponent = () => {
    const [tabValue, setTabValue] = useState(0);
    const [registrationData, setRegistrationData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://test-api-py77dwlbxa-df.a.run.app/data');
                const data = await response.json();
                setRegistrationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f7f7f7', minHeight: '100vh' }}>
            <MenuTab value={tabValue} onChange={handleTabChange} />
            <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DataTable data={registrationData} searchTerm={searchTerm} />
        </Box>
    );
};

export default TableComponent;
