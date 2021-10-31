const formData = [
  {
    field: 'name',
    label: '姓名',
    component: 'n-input',
    isFull: true,
    labelPlacement: 'left',
    labelMessage: '我是姓名的label',
    labelMessageStyle: {
      color: '#FBA',
      fontSize: '13px'
    },
    labelIconStyle: {},
    labelIcon: 'alertMark',
    slot: {},
    checkboxProps: {},
    radiogroupProps: {},
  },
  {
    field: 'date',
    label: '出生日期',
    component: 'n-date-picker',
    isFull: true,
    labelPlacement: 'left',
    labelMessage: '我是日期的label',
    labelMessageStyle: {
      marginLeft: '10px',
    },
    labelIconStyle: {},
    labelIcon: 'messageMark'
  },
  {
    field: 'radio',
    label: '选项',
    component: 'n-radio',
    isFull: true,
    labelPlacement: 'left',
    labelMessage: '我是日期的label',
    labelMessageStyle: {
      marginLeft: '10px',
    },
    labelIconStyle: {},
    labelIcon: 'messageMark'
  },
  {
    field: 'select',
    label: '下拉框',
    component: 'n-select',
    selectOptions: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
      },
      {
        label: 'Drive My Car',
        value: 'song1'
      },
      {
        label: 'Norwegian Wood',
        value: 'song2'
      },
      {
        label: "You Won't See",
        value: 'song3',
        disabled: true
      },
      {
        label: 'Nowhere Man',
        value: 'song4'
      },
      {
        label: 'Think For Yourself',
        value: 'song5'
      },
      {
        label: 'The Word',
        value: 'song6'
      },
      {
        label: 'Michelle',
        value: 'song7',
        disabled: true
      },
      {
        label: 'What goes on',
        value: 'song8'
      },
      {
        label: 'Girl',
        value: 'song9'
      },
      {
        label: "I'm looking through you",
        value: 'song10'
      },
      {
        label: 'In My Life',
        value: 'song11'
      },
      {
        label: 'Wait',
        value: 'song12'
      }
    ]
  }
]


export {
  formData
}
