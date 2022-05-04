import	React, {ReactElement}				from	'react';
import	Image								from	'next/image';
import	{Cross, Grip}						from	'@yearn/web-lib/icons';
import	{useClientEffect, useLocalStorage}	from	'@yearn/web-lib/hooks';
import	{Button}							from	'@yearn/web-lib/components';
import	* as dnd_kit						from	'@dnd-kit/core';
import	* as dnd_kit_sortable				from	'@dnd-kit/sortable';
import	{AnimateLayoutChanges}				from	'@dnd-kit/sortable';
import	{CSS}								from	'@dnd-kit/utilities';
import	YEARN_APPS							from	'utils/yearnApps';

const {DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, MeasuringStrategy} = dnd_kit;
const {arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable, defaultAnimateLayoutChanges} = dnd_kit_sortable;

function SortableItem({item, onRemove, id, animateLayoutChanges}: {item: TAppList, onRemove: (s: string) => void, id: string, animateLayoutChanges: any}): ReactElement {
	const {attributes, listeners, setNodeRef: set_nodeRef, transform, transition} = useSortable({id, animateLayoutChanges});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		'--opacity': 0
	};

	return (
		<div
			className={'group relative col-span-1 w-full h-full rounded-lg cursor-default'}
			id={item.title}
			key={item.title}
			ref={set_nodeRef}
			style={style}
			{...attributes}>
			<div id={`child_${item.title}`} className={'feature-content'}>
				<div className={'flex justify-between p-4 space-x-4 w-full h-16'}>
					<div className={'flex justify-center items-center space-x-2'}>
						<div className={'w-6 min-w-[24px] h-6 rounded-full bg-secondary-variant'}>
							<Image src={item.icon} width={24} height={24} />
						</div>
						<h3 className={'self-center text-base font-bold capitalize'}>{item.title}</h3>
					</div>
					<div className={'flex z-50 justify-center items-center space-x-2'}>
						<div onClick={(): void => onRemove(item.id)}>
							<Cross className={'w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity cursor-pointer'} />
						</div>
						<div>
							<Grip
								{...listeners}
								className={'w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-grab touch-none'} />
						</div>
					</div>
				</div>
				<div className={'p-4 pt-0 md:p-6 md:pt-0'}>
					<div className={'mb-4'}>
						<p className={'text-sm text-typo-secondary'}>{'Voluptatem ut dolores error laboriosam sunt qui aliquid. Nam ut et sunt dolores deleniti fuga.'}</p>
					</div>
					<div className={'mt-auto'}>
						<Button as={'a'} href={item.url} target={'_blank'} rel={'noreferrer'}>
							{'Access app'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

type	TAppList = {
	id: string,
	title: string,
	url: string,
	icon: string,
	image: string
}
function	DashboardPage(): ReactElement {
	const	[shouldRender, set_shouldRender] = React.useState(false);
	const	[items, set_items] = useLocalStorage('appList', YEARN_APPS);
	const	sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	function handleDragEnd(event: any): void {
		const {active, over} = event;
		
		if (!over?.id) {
			return;
		}
		if (active.id !== over.id) {
			set_items((_items: TAppList[]): TAppList[] => {
				const oldIndex = _items.findIndex((e): boolean => e.id === active.id);
				const newIndex = _items.findIndex((e): boolean => e.id === over.id);
				return arrayMove(_items, oldIndex, newIndex);
			});
		}
	}

	function handleRemove(id: string): void {
		set_items((_items: TAppList[]): TAppList[] => _items.filter((_item): boolean => _item.id !== id));
	}

	useClientEffect((): void => {
		set_shouldRender(true);
	}, []);

	if (!shouldRender) {
		return <div />;
	}
	const animateLayoutChanges: AnimateLayoutChanges = (args): boolean =>
		args.isSorting || args.wasDragging
			? defaultAnimateLayoutChanges(args)
			: true;


	return (
		<section aria-label={'dashboard'}>
			<div className={'relative w-full'}>
				<div className={'features'}>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
						measuring={{droppable: {strategy: MeasuringStrategy.Always}}}>
						<SortableContext items={items as TAppList[]} strategy={rectSortingStrategy}>
							{(items as TAppList[]).map((item): ReactElement => (
								<SortableItem
									key={item.id}
									id={item.id}
									item={item}
									animateLayoutChanges={animateLayoutChanges}
									onRemove={handleRemove}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>
				<div className={'mt-10'}>
					<p
						onClick={(): void => set_items(YEARN_APPS)}
						className={'opacity-40 hover:opacity-100 transition-opacity cursor-pointer'}>
						{'Reset dashboard'}
					</p>
				</div>
			</div>
		</section>
	);
}

export default DashboardPage;
