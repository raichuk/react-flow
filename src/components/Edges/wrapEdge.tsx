import React, { memo, ComponentType, CSSProperties } from 'react';
import cx from 'classnames';

import store from '../../store';
import { ElementId, Edge, EdgeCompProps } from '../../types';

interface EdgeWrapperProps {
  id: ElementId;
  source: ElementId;
  target: ElementId;
  type: any;
  label?: string;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle: CSSProperties;
  onClick: (edge: Edge) => void;
  animated: boolean;
  selected: boolean;
  isInteractive: boolean;
}

export default (EdgeComponent: ComponentType<EdgeCompProps>) => {
  const EdgeWrapper = memo(
    ({
      id,
      source,
      target,
      type,
      animated,
      selected,
      onClick,
      isInteractive,
      label,
      labelStyle,
      labelShowBg,
      labelBgStyle,
      ...rest
    }: EdgeWrapperProps) => {
      const edgeClasses = cx('react-flow__edge', { selected, animated });
      const onEdgeClick = (): void => {
        if (!isInteractive) {
          return;
        }

        store.dispatch.setSelectedElements({ id, source, target });
        onClick({ id, source, target, type });
      };

      return (
        <g className={edgeClasses} onClick={onEdgeClick}>
          <EdgeComponent
            id={id}
            source={source}
            target={target}
            type={type}
            animated={animated}
            selected={selected}
            onClick={onClick}
            label={label}
            labelStyle={labelStyle}
            labelShowBg={labelShowBg}
            labelBgStyle={labelBgStyle}
            {...rest}
          />
        </g>
      );
    }
  );

  EdgeWrapper.displayName = 'EdgeWrapper';

  return EdgeWrapper;
};
