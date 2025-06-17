export default {
	theme: {
		extend: {
			keyframes: {
				pulseCustom: {
					'0%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
					'100%': { boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' },
					'150%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
				}
			},
			animation: {
				pulseCustom: 'pulseCustom 2s infinite'
			}
		}
	}
}
