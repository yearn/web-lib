import	React, {ReactElement}				from	'react';
import	{Cross, Grip}						from	'@yearn/web-lib/icons';
import	{useClientEffect, useLocalStorage}	from	'@yearn/web-lib/hooks';
import	{Button}							from	'@yearn/web-lib/components';
import	* as dnd_kit						from	'@dnd-kit/core';
import	* as dnd_kit_sortable				from	'@dnd-kit/sortable';
import	{CSS}								from	'@dnd-kit/utilities';
import	YEARN_APPS							from	'utils/yearnApps';

const {DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, MeasuringStrategy} = dnd_kit;
const {arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable} = dnd_kit_sortable;

function SortableItem({item, onRemove, id}: {item: TAppList, onRemove: (s: string) => void, id: string}): ReactElement {
	const {attributes, listeners, setNodeRef: set_nodeRef, transform, transition} = useSortable({id: id});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		'--opacity': 0
	};

	useClientEffect((): void => {
		const featuresEl = document.getElementById(item.title);
		// const featureEls = document.querySelectorAll('.feature');
		if (featuresEl) {
			const	cleanup = (): void => {
				featuresEl.removeEventListener('pointermove', pointermove);
				featuresEl.removeEventListener('pointerleave', pointerleave);
			};

			const	pointermove = (ev: any): void => {
				const rect = featuresEl.getBoundingClientRect();
				if (featuresEl?.style) {
					featuresEl.style.setProperty('--opacity', '0.7');
					featuresEl.style.setProperty('--x', (ev.clientX - rect.left).toString());
					featuresEl.style.setProperty('--y', (ev.clientY - rect.top).toString());
				}
			};

			const	pointerleave = (): void => {
				if (featuresEl?.style) {
					featuresEl.style.setProperty('--opacity', '0');
				}
			};

			featuresEl.addEventListener('pointermove', pointermove);
			featuresEl.addEventListener('pointerleave', pointerleave);
			return cleanup as any;
		}
	}, []);


	return (
		<div
			className={'group relative cursor-default feature'}
			id={item.title}
			key={item.title}
			ref={set_nodeRef}
			style={style}
			{...attributes}>
			<div className={'feature-content'}>
				<div className={'flex absolute top-2 right-2 z-50 flex-row space-x-2'}>
					<div onClick={(): void => onRemove(item.id)}>
						<Cross className={'w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity cursor-pointer'} />
					</div>
					<div {...listeners}>
						<Grip className={'w-4 h-4 opacity-40 hover:opacity-100 transition-opacity cursor-grab'} />
					</div>
				</div>
				<b className={'text-lg capitalize'}>{item.title}</b>
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
	);
}

type	TAppList = {
	id: string,
	title: string,
	url: string,
}
function	DisclaimerPage(): ReactElement {
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

export default DisclaimerPage;
