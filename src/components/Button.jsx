export default function Button({
	type,
	ariaLabel,
	style,
	icon,
	label,
	onClick,
}) {
	return (
		<button
			type={type}
			className={style}
			aria-label={ariaLabel}
			onClick={onClick}
		>
			{icon ? (
				<>
					<span className="text-lg" aria-hidden="true">
						<ion-icon name={icon}></ion-icon>
					</span>
				</>
			) : (
				label
			)}
		</button>
	);
}
