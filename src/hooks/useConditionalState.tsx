import React from "react";

type UpdateConditionFn<T> = (currentState: T) => T | null;

/**
 * useState와 유사하지만 특정 의존성이 변경될 때 조건부로 상태를 업데이트하는 훅
 * @param initialState 초기 상태 값
 * @param updateCondition 상태 업데이트 조건 함수 또는 직접 설정할 값 , 어떻게 바꿀지: 함수 or 값
 * @param dependencies 의존성 배열
 * @returns [상태, 상태 설정 함수]
 */
const useConditionalState = <T,>(
  initialState: T,
  updateCondition?: UpdateConditionFn<T> | T,
  dependencies?: React.DependencyList
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // 상태와 초기 렌더링 여부
  const [state, setState] = React.useState<T>(initialState);
  const isFirstRender = React.useRef(true); // 첫 렌더링 여부를 추적하는 ref

  // 의존성 배열의 변경을 문자열로 추적 (예: "[1,2,3]" 형태)
  const dependenciesKey = React.useMemo(() => {
    return dependencies ? JSON.stringify(dependencies) : ""; // 배열은 매 렌더마다 참조가 바뀌어서 useEffect가 오작동할 수 있어. 문자열로 만들면 값이 같으면 같다고 인식 → 정확한 비교
  }, [dependencies]);

  /**
   * 깊은 비교(단순화된 방식): 이전 값과 새 값의 JSON 문자열을 비교하여 달라졌는지 확인
   */
  const hasChanged = React.useCallback(
    // 객체·배열은 === 로 비교하면 내용 같아도 다르다고 나옴(참조 비교). JSON으로 바꾸면 내용 비교 가능
    (prev: T, next: T) => JSON.stringify(prev) !== JSON.stringify(next),
    []
  );

  /**
   * 상태를 한 번에 업데이트하는 함수
   * - updateCondition이 함수라면 (currentState) => newState | null
   * - updateCondition이 값이라면 그대로 설정
   */
  const updateStateConditionally = React.useCallback(
    (condition: UpdateConditionFn<T> | T) => {
      setState((prevState) => {
        // 함수인 경우(조건부 업데이트 로직 수행)
        if (typeof condition === "function") {
          const nextState = (condition as UpdateConditionFn<T>)(prevState);
          // null이면 업데이트 거부
          if (nextState === null) return prevState;
          // 값이 달라야만 업데이트
          return hasChanged(prevState, nextState) ? nextState : prevState;
        }

        // 값인 경우(직접 설정)
        return hasChanged(prevState, condition) ? condition : prevState;
      });
    },
    [hasChanged]
  );

  /**
   * 의존성 배열(dependenciesKey)이 변경될 때마다 updateCondition 실행
   * - 첫 렌더링은 스킵 = > 초기 상태를 유지
   */
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!updateCondition) return;

    updateStateConditionally(updateCondition);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependenciesKey, updateStateConditionally]);

  return [state, setState];
};

export default useConditionalState;
